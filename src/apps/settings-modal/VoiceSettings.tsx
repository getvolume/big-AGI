import * as React from 'react';

import { FormControl } from '@mui/joy';

import { useChatMicTimeoutMs } from '../chat/store-app-chat';

import { FormLabelStart } from '~/common/components/forms/FormLabelStart';
import { FormRadioControl } from '~/common/components/forms/FormRadioControl';
import { LanguageSelect } from '~/common/components/LanguageSelect';
import { useIsMobile } from '~/common/components/useMatchMedia';


export function VoiceSettings() {

  // external state
  const isMobile = useIsMobile();
  const [chatTimeoutMs, setChatTimeoutMs] = useChatMicTimeoutMs();


  // this converts from string keys to numbers and vice versa
  const chatTimeoutValue: string = '' + chatTimeoutMs;
  const setChatTimeoutValue = (value: string) => value && setChatTimeoutMs(parseInt(value));

  return <>

    {/* LanguageSelect: moved from the UI settings (where it logically belongs), just to group things better from an UX perspective */}
    <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <FormLabelStart title='Language'
                      description='ASR and TTS'
                      tooltip='Currently for Microphone input and Voice output. Microphone support varies by browser (iPhone/Safari lacks speech input). We will use the ElevenLabs MultiLanguage model if a language other than English is selected.' />
      <LanguageSelect />
    </FormControl>

    {!isMobile && <FormRadioControl
      title='Mic Timeout'
      description={chatTimeoutMs < 1000 ? 'Best for quick calls' : chatTimeoutMs > 5000 ? 'Best for thinking' : 'Standard'}
      options={[
        { value: '600', label: '.6s' },
        { value: '2000', label: '2s' },
        { value: '5000', label: '5s' },
        { value: '15000', label: '15s' },
      ]}
      value={chatTimeoutValue} onChange={setChatTimeoutValue}
    />}

  </>;
}