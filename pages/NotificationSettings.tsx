
import React, { useState } from 'react';

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    marketTrends: true,
    newMerchants: true,
    priceDrops: false,
    directMessages: true,
    hatoMatches: true,
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingRow = ({ title, description, value, toggleKey }: { title: string, description: string, value: boolean, toggleKey: keyof typeof settings }) => (
    <div className="flex items-center justify-between p-6 bg-surface-dark border border-white/5 rounded-3xl group hover:border-primary/20 transition-all">
      <div className="flex-1 pr-8">
        <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
        <p className="text-white/40 text-xs leading-relaxed">{description}</p>
      </div>
      <button 
        onClick={() => toggleSetting(toggleKey)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${value ? 'bg-primary' : 'bg-white/10'}`}
      >
        <div className={`absolute top-1 left-1 size-4 rounded-full bg-background-dark transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-0'}`} />
      </button>
    </div>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-4xl">notifications_active</span>
          Alert <span className="text-primary">Center</span>
        </h1>
        <p className="text-white/40 mt-2 font-medium">Manage how and when you receive market updates and merchant communications.</p>
      </div>

      <div className="space-y-10">
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Marketplace Activity</h3>
            <div className="h-px flex-1 bg-primary/10"></div>
          </div>
          <div className="space-y-4">
            <SettingRow 
              title="New Market Trends" 
              description="Receive weekly summaries of trending wholesale items in the Egyptian market." 
              value={settings.marketTrends} 
              toggleKey="marketTrends"
            />
            <SettingRow 
              title="Verified Merchant Alerts" 
              description="Get notified when a high-volume factory owner or importer joins MarketHup." 
              value={settings.newMerchants} 
              toggleKey="newMerchants"
            />
            <SettingRow 
              title="HATOo Auto-Search Results" 
              description="Alerts when our visual engine finds a direct match for your previous HATOo scans." 
              value={settings.hatoMatches} 
              toggleKey="hatoMatches"
            />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Communication</h3>
            <div className="h-px flex-1 bg-primary/10"></div>
          </div>
          <div className="space-y-4">
            <SettingRow 
              title="Direct Messages" 
              description="Instant alerts for chat responses from wholesalers and agents." 
              value={settings.directMessages} 
              toggleKey="directMessages"
            />
            <SettingRow 
              title="Price Negotiations" 
              description="Get notified when a merchant updates a bulk pricing quote for you." 
              value={settings.priceDrops} 
              toggleKey="priceDrops"
            />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Channel Preferences</h3>
            <div className="h-px flex-1 bg-primary/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'emailAlerts', label: 'Email', icon: 'mail' },
              { id: 'smsAlerts', label: 'SMS', icon: 'sms' },
              { id: 'pushNotifications', label: 'Push', icon: 'vibration' },
            ].map((channel) => (
              <button
                key={channel.id}
                onClick={() => toggleSetting(channel.id as keyof typeof settings)}
                className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 ${
                  settings[channel.id as keyof typeof settings]
                    ? 'bg-primary/10 border-primary/40 text-primary'
                    : 'bg-surface-dark border-white/5 text-white/20'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">{channel.icon}</span>
                <span className="text-xs font-black uppercase tracking-widest">{channel.label}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
          <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Settings are synced across devices</p>
          <button 
            onClick={() => window.alert('Notification preferences saved successfully.')}
            className="px-8 py-3 bg-primary text-black font-black rounded-xl shadow-neon-bright hover:scale-105 transition-all text-xs uppercase tracking-[0.2em] italic"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
