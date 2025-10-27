import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function CardUnauthorized() {
  return (
    <Card className='w-1/2 mx-auto mt-10 text-center'>
      <CardHeader>
        <CardTitle>Acceso restringido</CardTitle>
        <CardDescription>No tiene permitido ingresar a esta sección.</CardDescription>
      </CardHeader>
    </Card>
  )
}
