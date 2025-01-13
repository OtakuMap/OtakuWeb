import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as S from '../../styles/map/RouteLeftContainer.styles';
import BackButton from '../common/BackButton';
// import { RouteLocation } from '../../types/map/route';

const RouteLeftContainer = () => {
  // 임시 데이터
  const [routeData, setRouteData] = useState({
    title: '다이아몬드 에이스',
    description: '아니 그니까 지금 내가 KBO보다가 고시엔까지 왔다고',
    locations: [
      { id: 1, name: '여기는 어디죠', isSelected: false },
      { id: 2, name: '한신 고시엔 스타디움', isSelected: false },
      { id: 3, name: '세븐일레븐', isSelected: false },
      { id: 4, name: '고시엔', isSelected: false },
      { id: 5, name: '여기는 어디죠', isSelected: false },
    ],
  });

  // 드래그 앤 드롭 처리
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(routeData.locations);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRouteData((prev) => ({
      ...prev,
      locations: items,
    }));
  };

  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 라디오 버튼 선택 처리
  const handleRadioChange = (id: number) => {
    setSelectedId(id);
    setRouteData((prev) => ({
      ...prev,
      locations: prev.locations.map((location) => ({
        ...location,
        isSelected: location.id === id, // 토글이 아닌 직접 할당
      })),
    }));
  };

  // 선택된 항목 삭제
  const handleDeleteSelected = () => {
    setRouteData((prev) => ({
      ...prev,
      locations: prev.locations.filter((location) => !location.isSelected),
    }));
  };

  // 루트 저장
  const handleSaveRoute = () => {
    console.log('저장된 루트:', routeData.locations);
  };

  // 뒤로가기 처리
  const handleBack = () => {
    window.history.back();
  };

  return (
    <S.Container>
      <BackButton onClick={handleBack} />
      <S.Title>{routeData.title}</S.Title>
      <S.Description>
        <p>{routeData.description}</p>
        <S.EditButton
          src="src/assets/edit.png"
          alt="edit"
          onClick={() => console.log('편집 모드')}
        />
      </S.Description>
      <S.Divider />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="route-list">
          {(provided) => (
            <S.RouteList {...provided.droppableProps} ref={provided.innerRef}>
              {routeData.locations.map((location, index) => (
                <Draggable key={location.id} draggableId={String(location.id)} index={index}>
                  {(provided) => (
                    <S.RouteItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <S.NumberBox>{index + 1}</S.NumberBox>
                      <S.LocationBox>{location.name}</S.LocationBox>
                      <S.RadioButton
                        type="radio"
                        name="routeSelection"
                        checked={location.id === selectedId} // isSelected 대신 selectedId와 비교
                        onChange={() => handleRadioChange(location.id)}
                      />
                    </S.RouteItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </S.RouteList>
          )}
        </Droppable>
      </DragDropContext>

      <S.DeleteButton onClick={handleDeleteSelected}>루트 선택 삭제</S.DeleteButton>
      <S.SaveButton onClick={handleSaveRoute}>이 루트 저장하기</S.SaveButton>
    </S.Container>
  );
};

export default RouteLeftContainer;
