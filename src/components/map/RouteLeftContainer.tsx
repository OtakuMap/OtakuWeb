import React, { useState, memo, useCallback, useRef, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as S from '../../styles/map/RouteLeftContainer.styles';
import BackButton from '../common/BackButton';
import {
  RouteLocation,
  RouteData,
  RouteInfo,
  CustomRouteRequest,
  UpdateRouteRequest,
} from '../../types/map/route';
import RouteDescriptionEditor from './RouteDescriptionEditor';
import { useNavigate } from 'react-router-dom';
import { RouteSource } from '@/types/map/routeSource';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';
import { updateRoute } from '@/api/map/routeUpdate';
import { saveCustomRoute } from '@/api/map/routeSave';
import { toast } from 'react-toastify';
import edit from '../../assets/edit.png';

interface RouteLeftContainerProps {
  initialLocations: RouteLocation[];
  onLocationsChange: (locations: RouteLocation[]) => void;
  routeSource: RouteSource;
  routeId?: number;
  routeInfo: RouteInfo;
}

interface SortableItemProps {
  location: RouteLocation;
  index: number;
  selectedId: number | null;
  onRadioChange: (id: number) => void;
}

// Sortable item component
const SortableRouteItem: React.FC<SortableItemProps> = memo(
  ({ location, index, selectedId, onRadioChange }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: location.id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <S.RouteItem ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <S.NumberBox>{index + 1}</S.NumberBox>
        <S.LocationBox>{location.name}</S.LocationBox>
        <S.RadioButton
          type="radio"
          name="routeSelection"
          checked={location.id === selectedId}
          onChange={() => onRadioChange(location.id)}
        />
      </S.RouteItem>
    );
  },
);

SortableRouteItem.displayName = 'SortableRouteItem';

const RouteLeftContainer: React.FC<RouteLeftContainerProps> = ({
  initialLocations,
  onLocationsChange,
  routeSource,
  routeId,
  routeInfo,
}) => {
  const [routeData, setRouteData] = useState<RouteData>({
    title: routeInfo.animationName,
    description: routeInfo.routeName,
    locations: initialLocations,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile] = useState(window.innerWidth <= 430);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  //루트명 일정 글자 수 넘어가면 ...처리
  interface TruncatedDescriptionProps {
    text: string;
  }

  const TruncatedDescription: React.FC<TruncatedDescriptionProps> = ({ text }) => {
    const MAX_LENGTH = 33;
    const truncatedText = text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}...` : text;
    return <p>{truncatedText}</p>;
  };

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) {
        return;
      }

      setRouteData((prev) => {
        const oldIndex = prev.locations.findIndex((item) => item.id === active.id);
        const newIndex = prev.locations.findIndex((item) => item.id === over.id);

        const newLocations = arrayMove(prev.locations, oldIndex, newIndex);
        onLocationsChange(newLocations);

        return {
          ...prev,
          locations: newLocations,
        };
      });
    },
    [onLocationsChange],
  );

  const handleRadioChange = useCallback((id: number) => {
    setSelectedId(id);
    setRouteData((prev) => ({
      ...prev,
      locations: prev.locations.map((location) => ({
        ...location,
        isSelected: location.id === id,
      })),
    }));
  }, []);

  const handleDeleteSelected = useCallback(() => {
    if (selectedId === null) return;

    setRouteData((prev) => {
      const newLocations = prev.locations.filter((location) => !location.isSelected);
      onLocationsChange(newLocations);

      return {
        ...prev,
        locations: newLocations,
      };
    });
    setSelectedId(null);
  }, [selectedId, onLocationsChange]);

  const handleDragStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      const startY = touch.clientY;
      let currentY = startY;

      const handleMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const deltaY = touch.clientY - currentY;
        currentY = touch.clientY;

        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          if (deltaY > 0 && !isExpanded) return;
          if (deltaY < 0 && rect.top <= 0) return;
          containerRef.current.style.transform = `translateY(${deltaY}px)`;
        }
      };

      const handleEnd = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const threshold = window.innerHeight * 0.3;

          setIsExpanded(rect.top <= threshold);
        }
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };

      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleEnd);
    },
    [isExpanded],
  );

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // const handleSaveRoute = useCallback(async () => {
  //   if (!isLoggedIn) {
  //     dispatch(openLoginModal());
  //     return;
  //   }

  //   if (isSaving) return;

  //   try {
  //     setIsSaving(true);

  //     const routeItems = routeData.locations.map((location, index) => ({
  //       name: location.name,
  //       placeId: location.id,
  //       itemOrder: index,
  //     }));

  //     let response;
  //     if (routeSource === RouteSource.REVIEW) {
  //       // 후기에서 온 경우 - 새로운 루트 생성
  //       const requestData = {
  //         name: routeData.description,
  //         routeItems,
  //       };
  //       response = await saveCustomRoute(requestData);
  //       toast.success('새로운 루트가 저장되었습니다!');
  //     } else {
  //       // 저장된 루트나 좋아요한 루트에서 온 경우 - 기존 루트 수정
  //       if (!routeId) {
  //         throw new Error('루트 ID가 없습니다.');
  //       }
  //       const requestData = {
  //         name: routeData.description,
  //         routeId: routeId,
  //         routeItems: routeItems.map(({ name, ...rest }) => rest),
  //       };
  //       response = await updateRoute(requestData);
  //       toast.success('루트가 수정되었습니다!');
  //     }

  //     console.log('저장된 루트:', response);

  //     // 성공 후 적절한 페이지로 리다이렉트
  //     // if (routeSource === RouteSource.REVIEW) {
  //     //   navigate('/route-management');
  //     // } else {
  //     //   navigate(-1);
  //     // }
  //     // 테스트를 위해 임시로 수정
  //     if (routeSource === RouteSource.REVIEW) {
  //       navigate('/route-management');
  //     } else {
  //       navigate(-1);
  //     }
  //   } catch (error: any) {
  //     console.error('루트 저장 실패:', error);
  //     toast.error(error.message || '루트 저장에 실패했습니다. 다시 시도해주세요.');
  //   } finally {
  //     setIsSaving(false);
  //   }
  // }, [isLoggedIn, routeData, routeSource, routeId, dispatch, isSaving, navigate]);

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  const handleSaveRoute = useCallback(async () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }

    if (isSaving) return;

    try {
      setIsSaving(true);

      const routeItems = routeData.locations.map((location, index) => ({
        name: location.name,
        placeId: location.id,
        itemOrder: index,
      }));

      let response;
      if (routeSource === RouteSource.REVIEW) {
        // 후기에서 온 경우 - 새로운 루트 생성
        const requestData: CustomRouteRequest = {
          originalRouteId: routeId || 0, // 현재의 routeId 사용
          name: routeData.description,
          routeItems,
        };
        response = await saveCustomRoute(requestData);
        toast.success('새로운 루트가 저장되었습니다!');
      } else {
        // 저장된 루트나 좋아요한 루트에서 온 경우 - 기존 루트 수정
        if (!routeId) {
          throw new Error('루트 ID가 없습니다.');
        }
        const requestData: UpdateRouteRequest = {
          name: routeData.description,
          routeId: routeId,
          routeItems: routeItems.map(({ name, ...rest }) => rest),
        };
        response = await updateRoute(requestData);
        toast.success('루트가 수정되었습니다!');
      }

      console.log('저장된 루트:', response);

      if (routeSource === RouteSource.REVIEW) {
        navigate('/route-management');
      } else {
        navigate(-1);
      }
    } catch (error: any) {
      console.error('루트 저장 실패:', error);
      toast.error(error.message || '루트 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  }, [isLoggedIn, routeData, routeSource, routeId, dispatch, isSaving, navigate]);

  //설명 수정 - 저장
  const handleDescriptionSave = (newDescription: string) => {
    setRouteData((prev) => ({
      ...prev,
      description: newDescription,
    }));
    setIsEditing(false);
  };

  return (
    <S.Container ref={containerRef} className={isExpanded ? 'expanded' : ''}>
      {isMobile && <S.HandleBar onClick={toggleExpand} />}
      <BackButton onClick={handleBack} />
      <S.Title>{routeData.title}</S.Title>
      {isEditing ? (
        <RouteDescriptionEditor
          description={routeData.description}
          onSave={handleDescriptionSave}
        />
      ) : (
        <S.Description>
          <TruncatedDescription text={routeData.description} />
          <S.EditButton src={edit} alt="edit" onClick={() => setIsEditing(true)} />
        </S.Description>
      )}
      <S.Divider />

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <S.RouteList>
          <SortableContext
            items={routeData.locations.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {routeData.locations.map((location, index) => (
              <SortableRouteItem
                key={location.id}
                location={location}
                index={index}
                selectedId={selectedId}
                onRadioChange={handleRadioChange}
              />
            ))}
          </SortableContext>
        </S.RouteList>
      </DndContext>

      <S.DeleteButton onClick={handleDeleteSelected} disabled={selectedId === null}>
        루트 선택 삭제
      </S.DeleteButton>
      <S.SaveButton onClick={handleSaveRoute}>이 루트 저장하기</S.SaveButton>
    </S.Container>
  );
};

export default memo(RouteLeftContainer);
