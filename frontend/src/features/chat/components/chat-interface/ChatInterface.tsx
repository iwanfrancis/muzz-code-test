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
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <ChatHeader />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        {activeTab === 'chat' && <ChatTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </div>
    </div>
  )
}

export default ChatInterface
