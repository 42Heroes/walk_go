import React, { ReactElement, useState } from 'react';
import CommonLayout from '../components/layout/CommonLayout';
import UserCard from '../components/common/UserCard';
import { User } from '../interfaces/user.interface';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getUsers } from '../hooks/api/fetchUsers';
import { ProfileModal } from '../components/common/Modal';
import media from '../styles/media';
import LanguageDropdown from '../components/common/LanguageDropdown';
import languagesBase from '../library/languages';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';

interface Language {
  name: string;
}

export default function Find() {
  const me: User = {
    _id: 124352,
    nickname: 'junseo',
    intra_id: 'junseo',
    image_url: 'https://cdn.intra.42.fr/users/jojoo.jpg',
    campus: '42seoul',
    createdAt: new Date('2015-04-20T15:37:23'),
    hashtags: ['react', 'food'],
    country: 'korea',
    github_id: 'Seojunhwan',
    introduction: 'Interested in optimizaion',
    chatRooms: [123, 456, 789],
    liked_users: [
      {
        _id: 1323,
        nickname: 'sjo',
        intra_id: 'sjo',
        image_url: 'goodday',
        campus: '42seoul',
        createdAt: new Date('2015-04-20T15:37:23'),
        hashtags: ['react', 'food'],
        country: 'korea',
        github_id: 'Seojunhwan',
        introduction: 'Interested in optimizaion',
        chatRooms: [123, 456, 789],
        liked_users: [],
        saved_posts: [],
        posts: [],
        n_language: [{ name: 'korean' }],
        l_language: [{ name: 'english' }, { name: 'japanese' }],
        join_data: new Date('2015-04-20T15:37:23'),
      },
      {
        _id: 352,
        nickname: 'jojoo',
        intra_id: 'jojoo',
        image_url: 'goodday',
        campus: '42seoul',
        createdAt: new Date('2015-04-20T15:37:23'),
        hashtags: ['react', 'food'],
        country: 'korea',
        github_id: 'joo',
        introduction: 'Interested in optimizaion',
        chatRooms: [123, 456, 789],
        liked_users: [],
        saved_posts: [],
        posts: [],
        n_language: [{ name: 'korean' }],
        l_language: [{ name: 'english' }, { name: 'japanese' }],
        join_data: new Date('2015-04-20T15:37:23'),
      },
    ],
    saved_posts: [],
    posts: [],
    n_language: [{ name: 'korean' }],
    l_language: [{ name: 'english' }, { name: 'japanese' }],
    join_data: new Date('2015-04-20T15:37:23'),
  };

  const { data } = useQuery<User[]>('users', getUsers, {
    keepPreviousData: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState({});

  const toggleModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented) {
      return;
    }
    setIsModalOpen(!isModalOpen);
  };

  const [languages] = useState([{ name: 'All' }, ...languagesBase]);
  console.log(languages);
  const handleNLanguageClick = (clickedLanguage: Language) => {
    setSelectedNLanguage(clickedLanguage);
    setIsNDropdownOpened(false);
  };

  const handleLLanguageClick = (clickedLanguage: Language) => {
    setSelectedLLanguage(clickedLanguage);
    setIsLDropdownOpened(false);
  };

  const [isNDropdownOpened, setIsNDropdownOpened] = useState(false);
  const [isLDropdownOpened, setIsLDropdownOpened] = useState(false);
  const [selectedNLanguage, setSelectedNLanguage] = useState({ name: 'All' });
  const [selectedLLanguage, setSelectedLLanguage] = useState({ name: 'All' });

  const filteredUsers =
    // 필터링 없을 때
    selectedNLanguage.name === 'All' && selectedLLanguage.name === 'All'
      ? data
      : // n_language에만 필터링
      selectedNLanguage.name !== 'All' && selectedLLanguage.name === 'All'
      ? data?.filter((user) =>
          user.n_language.some(
            (language) => language.name === selectedNLanguage.name,
          ),
        )
      : // l_language에만 필터링
      selectedNLanguage.name === 'All' && selectedLLanguage.name !== 'All'
      ? data?.filter((user) =>
          user.l_language.some(
            (language) => language.name === selectedLLanguage.name,
          ),
        )
      : // 양쪽 모두에 필터링
        data?.filter(
          (user) =>
            user.l_language.some(
              (language) => language.name === selectedLLanguage.name,
            ) &&
            user.n_language.some(
              (language) => language.name === selectedNLanguage.name,
            ),
        );

  return (
    <Container>
      {/* 언어 필터링 드롭다운 */}
      <LanguageDropdownContainer>
        {/* 할 수 있는 언어 필터링 */}
        <LanguageDropdownWrapper>
          <p>Natvie in</p>
          <LanguageSelectBox>
            <div
              className="selectedItem"
              onClick={() => setSelectedNLanguage({ name: 'All' })}
            >
              {selectedNLanguage.name.toUpperCase()}
            </div>
          </LanguageSelectBox>
          {isNDropdownOpened ? (
            <IndeterminateCheckBoxRoundedIcon
              sx={{ fontSize: 25 }}
              onClick={() => setIsNDropdownOpened(false)}
            />
          ) : (
            <AddBoxRoundedIcon
              sx={{ fontSize: 25 }}
              onClick={() => setIsNDropdownOpened(true)}
            />
          )}
          <Temp>
            <StyledLanguageDropdown
              onClickLanguage={handleNLanguageClick}
              languages={languages}
              selectedLanguages={[selectedLLanguage]}
              isOpened={isNDropdownOpened}
            />
          </Temp>
        </LanguageDropdownWrapper>

        {/* 배우고 싶은 언어 필터링 */}
        <LanguageDropdownWrapper>
          <p>Learning</p>
          <LanguageSelectBox>
            <div
              className="selectedItem"
              onClick={() => setSelectedLLanguage({ name: 'All' })}
            >
              {selectedLLanguage.name.toUpperCase()}
            </div>
          </LanguageSelectBox>
          {isLDropdownOpened ? (
            <IndeterminateCheckBoxRoundedIcon
              sx={{ fontSize: 25 }}
              onClick={() => setIsLDropdownOpened(false)}
            />
          ) : (
            <AddBoxRoundedIcon
              sx={{ fontSize: 25 }}
              onClick={() => setIsLDropdownOpened(true)}
            />
          )}
          <Temp>
            <StyledLanguageDropdown
              onClickLanguage={handleLLanguageClick}
              languages={languages}
              selectedLanguages={[selectedNLanguage]}
              isOpened={isLDropdownOpened}
            />
          </Temp>
        </LanguageDropdownWrapper>
      </LanguageDropdownContainer>

      {/* 유저 카드 */}
      <UserCardWrapper>
        {filteredUsers?.map((user) => {
          return (
            <div
              key={user._id}
              onClick={() => {
                setModalUser(user);
                setIsModalOpen(true);
              }}
            >
              <UserCard userCardData={user} myData={me} />
            </div>
          );
        })}
        {isModalOpen && (
          <ProfileModal user={modalUser} toggleModal={toggleModal} />
        )}
      </UserCardWrapper>
    </Container>
  );
}

const Container = styled.div``;

const LanguageDropdownContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 15rem;
  flex-direction: column;
  ${media.medium} {
    flex-direction: row;
  }
  ${media.large} {
    flex-direction: row;
  }
`;

const LanguageDropdownWrapper = styled.div`
  color: white;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  margin-top: 2rem;
  svg {
    fill: ${({ theme }) => theme.pointColor};
    cursor: pointer;
  }
`;

const LanguageSelectBox = styled.div`
  background-color: #242526;
  border-radius: 10rem;
  padding: 2rem;
  color: white;
  font-size: 2rem;
  width: 17rem;
  height: 4rem;
  margin: 0 2rem;
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.grayColor};
    color: ${({ theme }) => theme.fontColor.commentColor};
  }
`;

const StyledLanguageDropdown = styled(LanguageDropdown)`
  /* left: 0; */
  /* position: relative; */
`;

const UserCardWrapper = styled.div`
  margin: 5rem 3rem;
  display: grid;
  row-gap: 3rem;
  column-gap: 2rem;
  place-items: center;

  grid-template-columns: repeat(1, 1fr);

  ${media.medium} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${media.large} {
    grid-template-columns: repeat(auto-fill, minmax(39rem, auto));
  }
`;

const Temp = styled.div`
  z-index: 99;
  background-color: 000000;
  /* position: relative; */
  /* bottom: 0; */
`;

Find.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Find">{page}</CommonLayout>;
};
