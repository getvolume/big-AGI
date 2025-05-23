import * as React from 'react';

import { Box, FormControl, FormHelperText, FormLabel, IconButton, Input } from '@mui/joy';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { getIsMobile } from '~/common/components/useMatchMedia';


export function FormInputKey(props: {
  autoCompleteId: string, // introduced to avoid clashes
  label?: string, rightLabel?: string | React.JSX.Element,
  description?: string | React.JSX.Element,
  value: string, onChange: (value: string) => void,
  placeholder?: string,
  initiallyShowKey?: boolean,
  required: boolean, isError?: boolean,
  noKey?: boolean,
}) {

  // internal state is only whether the text is visible or not - the actual value is stored in the parent
  const [isVisible, setIsVisible] = React.useState(!!props.initiallyShowKey);

  // if mobile, start without autocompletion
  const disableAutoFocus = getIsMobile();

  const handleChange = (e: React.ChangeEvent) => props.onChange((e.target as HTMLInputElement).value);

  const endDecorator = React.useMemo(() => !!props.value && !props.noKey && (
    <IconButton onClick={() => setIsVisible(!isVisible)}>
      {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </IconButton>
  ), [props.value, props.noKey, isVisible]);

  const acId = (props.noKey ? 'input-text-' : 'input-key-') + props.autoCompleteId;

  return (
    <FormControl id={acId}>

      {!!props.label && <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <FormLabel>{props.label}</FormLabel>
        {!!props.rightLabel && <FormHelperText sx={{ display: 'block' }}>
          {props.rightLabel}
        </FormHelperText>}
      </Box>}

      <Input
        key={acId}
        name={acId}
        autoComplete='off'
        autoFocus={disableAutoFocus ? undefined : !props.required ? undefined : props.value ? undefined : true}
        // autoComplete={props.noKey ? 'off' : 'new-password'}
        variant={props.required ? 'outlined' : 'outlined' /* 'soft */}
        value={props.value} onChange={handleChange}
        placeholder={props.required ? props.placeholder ? 'required: ' + props.placeholder : 'required' : props.placeholder || '...'}
        type={(isVisible || !!props.noKey) ? 'text' : 'password'}
        error={props.isError}
        startDecorator={!props.noKey && <KeyIcon />}
        endDecorator={endDecorator}
      />

      {props.description && <FormHelperText sx={{ display: 'block' }}>{props.description}</FormHelperText>}

    </FormControl>
  );
}