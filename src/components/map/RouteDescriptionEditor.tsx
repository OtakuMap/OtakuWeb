import { useState } from 'react';
import * as S from '../../styles/map/RouteDescriptionEditor.styles';
import { toast } from 'react-toastify';

interface RouteDescriptionEditorProps {
  description: string; // title -> description으로 변경
  onSave: (description: string) => void;
}

const RouteDescriptionEditor = ({ description, onSave }: RouteDescriptionEditorProps) => {
  const [currentDescription, setCurrentDescription] = useState(description);

  const handleSave = () => {
    if (!currentDescription.trim()) {
      // 공백만 있는 경우도 체크
      toast.error('한 글자 이상 입력해주세요.');
      return;
    }
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
