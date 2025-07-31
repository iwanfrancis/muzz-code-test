import { useState } from 'react'
import Tabs from '@/components/navigation/tabs/Tabs'
import ChatHeader from '../chat-header/ChatHeader'
import ChatTab from '../chat-tab/ChatTab'
import ProfileTab from '../profile-tab/ProfileTab'

type TabId = 'chat' | 'profile'

const tabs = [
  { id: 'chat' as const, label: 'Chat' },
  { id: 'profile' as const, label: 'Profile' },
] as const

const ChatInterface = () => {
  const [activeTab, setActiveTab] = useState<TabId>('chat')

  return (
    <div className="flex flex-col h-screen max-h-screen w-full overflow-hidden">
      <ChatHeader />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'chat' && <ChatTab />}
      {activeTab === 'profile' && <ProfileTab />}
    </div>
  )
}

export default ChatInterface
