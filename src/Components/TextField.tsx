import * as React from  'react';

interface Person  {
  firstname: string,
  lastName: string
}

interface Props {
  text: string,
  number?: number,
  status?: boolean,
  person? : Person,
  fn?: ()=>null
}

export const TextField: React.FC<Props> = (props) => {
  return (
      <div>
        <input />
      </div>
  )
}
