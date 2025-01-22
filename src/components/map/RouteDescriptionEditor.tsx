import React, { useState } from 'react';
import * as S from '../../styles/map/RouteDescriptionEditor.styles';

interface RouteDescriptionEditorProps {
  description: string;
  onSave: (description: string) => void;
}

const RouteDescriptionEditor = ({ description, onSave }: RouteDescriptionEditorProps) => {
  const [currentDescription, setCurrentDescription] = useState(description);

  const handleSave = () => {
    onSave(currentDescription);
  };

  return (
    <S.Container>
      <S.InputArea>
        <S.TextArea
          placeholder="루트명을 입력하세요"
          value={currentDescription}
          onChange={(e) => setCurrentDescription(e.target.value)}
        />
      </S.InputArea>
      <S.DashedLine top={42} />
      <S.DashedLine top={84} />
      <S.EditButton onClick={handleSave}>저장</S.EditButton>
    </S.Container>
  );
};

export default RouteDescriptionEditor;
