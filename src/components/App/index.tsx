import React, { memo, useState, useEffect, useRef } from 'react';
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
  const [raw, setRaw] = useState<string>('');
  const [result, setResult] = useState<string[][]>([]);
  const resultContainer = useRef<HTMLDivElement | null>(null);

  /* Functions */
  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    const v = value as PARSE_OPTIONS;
    setOption(v);
  };
  const handleRawInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setRaw(event.target.value);
  };
  const handleCopy = (): void => {
    if (!resultContainer.current) return;
    const range = document.createRange();
    range.selectNode(resultContainer.current);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    document.execCommand('copy');
    window.getSelection()?.removeAllRanges();
  };

  /* Hooks */
  useEffect(() => {
    if (!raw.trim().length) return;

    if (option === PARSE_OPTIONS.CSS_TO_STYLED) {
      const first = raw.split(';');
      const second = first
        .map((item) => item.trim())
        .filter((item) => item.length);
      const finalArray = second.map((item) => {
        const holder: string[] = [];
        const [key, value] = item.split(':');
        let formatKey = `  ${key}: `;
        if (key.includes('-')) {
          const [first, second] = key.split('-');
          formatKey = `  ${first}${second
            .charAt(0)
            .toUpperCase()}${second.slice(1)}: `;
        }
        holder.push(formatKey);
        holder.push(`'${value.trim().replace(';', '')}',`);
        return holder;
      });
      setResult(finalArray);
    }

    if (option === PARSE_OPTIONS.STYLED_TO_CSS) {
      const first = raw.split(',');
      const second = first
        .map((item) => item.trim())
        .filter((item) => item.length);
      const finalArray = second.map((item) => {
        const holder: string[] = [];
        const [key, value] = item.split(':');
        let formatKey = `  ${key}: `;
        let upperCaseIndex = -1;
        key.split('').forEach((char, index) => {
          if (char === char.toUpperCase()) {
            upperCaseIndex = index;
          }
        });
        if (upperCaseIndex > -1) {
          formatKey = `  ${key.slice(0, upperCaseIndex)}-${key
            .slice(upperCaseIndex, key.length)
            .toLocaleLowerCase()}: `;
        }
        holder.push(formatKey);
        holder.push(
          `${value
            .trim()
            .replaceAll(',', '')
            .replaceAll(`'`, ``)
            .replaceAll(`"`, ``)};`
        );
        return holder;
      });
      setResult(finalArray);
    }
  }, [option, raw]);

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
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="raw">Input:</InputLabel>
            <InputBase
              id="raw"
              onChange={handleRawInput}
              rows={3}
              sx={{ border: '1px solid #ccc' }}
              autoFocus
              fullWidth
              multiline
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* <FormControl fullWidth>
            <InputLabel htmlFor="output">Output:</InputLabel>
            <InputBase
              id="output"
              rows={3}
              sx={{ border: '1px solid #ccc' }}
              value={result}
              fullWidth
              multiline
            />
          </FormControl> */}
          <div
            className="resultContainer"
            ref={resultContainer}
            style={{ fontFamily: 'monospace' }}
          >
            <span>{'{'}</span>
            {result.map((r, index) => (
              <div key={index}>
                <span style={{ whiteSpace: 'pre-wrap' }}>{r[0]}</span>
                {r[1]}
              </div>
            ))}
            <span>{'}'}</span>
          </div>
        </Grid>

        <Grid item xs={12}>
          <ButtonBase
            onClick={handleCopy}
            sx={{ width: '100%', backgroundColor: '#ccc' }}
          >
            Copy result
          </ButtonBase>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default memo(App);
