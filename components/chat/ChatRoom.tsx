import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import useMe from '../../hooks/useMe';
import { Chat } from '../../interfaces/chat.interface';
import { activeChatRoomIdState, unreadMessageState } from '../../recoil/atoms';
import ProfileImage from '../common/ProfileImage';

interface Props {
  chat: Chat;
  newMessages: number;
}

export default function ChatRoom({ chat, newMessages }: Props) {
  const { data: me } = useMe();
  const setUnreadMessages = useSetRecoilState(unreadMessageState);
  const [activeChatRoomId, setActiveChatRoomId] = useRecoilState(
    activeChatRoomIdState,
  );
  const otherUser = chat.users.find((user) => user._id !== me?._id);
  const lastMessage = chat.messages.length
    ? chat?.messages[chat.messages.length - 1].type === 'text'
      ? chat?.messages[chat.messages.length - 1].content
      : 'Image'
    : '아무도 채팅을 안 했습니당';

  const isActiveRoom = chat._id === activeChatRoomId;

  const handleChatRoomClick = () => {
    setUnreadMessages((unreadMessages) =>
      unreadMessages.filter((message) => message.chatRoom_id !== chat._id),
    );
    setActiveChatRoomId(chat._id);
  };

  return (
    <Container isActive={isActiveRoom} onClick={handleChatRoomClick}>
      <ImageContainer>
        <ProfileImage src={otherUser?.image_url ?? ''} size="medium" />
      </ImageContainer>
      <MessageContainer>
        <h1>{otherUser?.nickname}</h1>
        <p>{lastMessage}</p>
      </MessageContainer>
      {newMessages !== 0 && (
        <MessageNotification>
          <p>{newMessages}</p>
        </MessageNotification>
      )}
    </Container>
  );
}

const Container = styled.li<{ isActive: boolean }>`
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  padding: 2rem;
  background-color: ${(prop) => prop.isActive && '#242526'};
  border-radius: ${(prop) => prop.isActive && '2rem 0 2rem 0'};
  cursor: pointer;
`;

const ImageContainer = styled.div`
  min-width: 5rem;
`;

const MessageContainer = styled.div`
  padding: 0.5rem 1.5rem;
  color: ${({ theme }) => theme.fontColor.titleColor};
  width: 80%;
  height: 100%;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1.2rem;
    width: 100%;
    height: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
`;

const MessageNotification = styled.div`
  background-color: ${({ theme }) => theme.newChat};
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  p {
    color: ${({ theme }) => theme.fontColor.titleColor};
    font-weight: bold;
  }
`;
