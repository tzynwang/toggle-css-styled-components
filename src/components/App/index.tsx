import React, { memo, useState } from 'react';

import ButtonBase from '@mui/material/ButtonBase';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

enum PARSE_OPTIONS {
  CSS_TO_STYLED = 'CSS_TO_STYLED',
  STYLED_TO_CSS = 'STYLED_TO_CSS',
}

function App(): React.ReactElement {
  /* States */
  const [option, setOption] = useState<PARSE_OPTIONS | null>(null);

  /* Functions */
  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    const v = value as PARSE_OPTIONS;
    setOption(v);
  };

  /* Main */
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel id="demo-radio-buttons-group-label">
              Choose parser:
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={option}
              onChange={handleValueChange}
              name="radio-buttons-group"
              row
            >
              <FormControlLabel
                value={PARSE_OPTIONS.CSS_TO_STYLED}
                control={<Radio />}
                label="CSS to Styled Component"
              />
              <FormControlLabel
                value={PARSE_OPTIONS.STYLED_TO_CSS}
                control={<Radio />}
                label="Styled Component to CSS"
              />
            </RadioGroup>
            <ButtonBase sx={{ backgroundColor: '#ccc' }}>Parse</ButtonBase>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="raw">Input:</InputLabel>
            <InputBase id="raw" sx={{ border: '1px solid #ccc' }} />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="output">Output:</InputLabel>
            <InputBase id="output" sx={{ border: '1px solid #ccc' }} />
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default memo(App);
