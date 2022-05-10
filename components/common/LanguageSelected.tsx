import styled from 'styled-components';
import Image from 'next/image';
import ClearIcon from '@mui/icons-material/Clear';

interface LanguageInfo {
  flag: string;
  language: string;
}

interface Props {
  onClickDelete: (item: LanguageInfo) => void;
  selectedLanguages: LanguageInfo[];
}
export default function LanguageSelected({
  onClickDelete,
  selectedLanguages,
}: Props) {
  return (
    <ul>
      {selectedLanguages?.map((item: LanguageInfo) => (
        <SelectedList key={item.language} onClick={() => onClickDelete(item)}>
          <Contents>
            <Image alt={item.language} src={item.flag} width={23} height={14} />
            <LanguageName>{item.language.toUpperCase()}</LanguageName>
          </Contents>
          <ClearIcon fontSize="large" />
        </SelectedList>
      ))}
    </ul>
  );
}

const SelectedList = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border: 0.1rem solid;
  border-radius: 0.5rem;
  border-color: ${({ theme }) => theme.grayColor};
  height: 5rem;
  width: 34rem;
  margin: 2rem 0rem;
  font-family: JetBrainsMono, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: ${({ theme }) => theme.grayColor};
  cursor: pointer;
`;

const Contents = styled.div`
  display: flex;
`;
const LanguageName = styled.div`
  margin-left: 1rem;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.font.subTitleBold};
  font-size: 2.5rem;
  font-weight: bold;
`;
