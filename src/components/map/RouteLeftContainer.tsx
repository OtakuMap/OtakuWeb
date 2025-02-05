import React, { useState, memo, useCallback } from 'react';
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
import { RouteLocation, RouteData } from '../../types/map/route';
import RouteDescriptionEditor from './RouteDescriptionEditor';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';
import { saveCustomRoute } from '@/api/map/routeSave';
import { toast } from 'react-toastify';

interface RouteLeftContainerProps {
  initialLocations: RouteLocation[];
  onLocationsChange: (locations: RouteLocation[]) => void;
}

// Sortable item component
const SortableRouteItem = memo(
  ({
    location,
    index,
    selectedId,
    onRadioChange,
  }: {
    location: RouteLocation;
    index: number;
    selectedId: number | null;
    onRadioChange: (id: number) => void;
  }) => {
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
}) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [routeData, setRouteData] = useState<RouteData>({
    title: '다이아몬드 에이스',
    description: '아니 그니까 지금 내가 KBO보다가 고시엔까지 왔다고',
    locations: initialLocations,
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);

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
  const TruncatedDescription = ({ text }: { text: string }) => {
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
        placeId: location.id, // 실제 placeId가 있다면 그것을 사용
        itemOrder: index,
      }));

      const requestData = {
        name: routeData.title,
        routeItems,
      };

      const response = await saveCustomRoute(requestData);
      toast.success('루트가 성공적으로 저장되었습니다!');
      console.log('저장된 루트:', response);
    } catch (error) {
      console.error('루트 저장 실패:', error);
      toast.error('루트 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  }, [isLoggedIn, routeData, dispatch, isSaving]);

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  //설명 수정 - 저장
  const handleDescriptionSave = (newDescription: string) => {
    setRouteData((prev) => ({
      ...prev,
      description: newDescription,
    }));
    setIsEditing(false);
  };

  return (
    <S.Container>
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
          <S.EditButton src="/src/assets/edit.png" alt="edit" onClick={() => setIsEditing(true)} />
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
