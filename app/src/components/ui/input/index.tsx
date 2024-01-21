import { TextFieldProps, TextField } from '@mui/material'

type Props = TextFieldProps & {}
const Input: React.FC<Props> = ({ ...rest }) => {
  return <TextField {...rest} />
}

export default Input
