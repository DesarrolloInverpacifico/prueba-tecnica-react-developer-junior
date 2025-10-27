import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { Construction } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div>
      <Item>
        <ItemContent>
          <ItemTitle className='text-2xl font-bold'>Dashboard</ItemTitle>
          <ItemDescription>Panel de control principal de SafeCity.</ItemDescription>
        </ItemContent>
      </Item>
      <div className='flex justify-center items-center mt-4 '>
        <Card className='w-[90%] sm:w-[50%] '>
          <CardHeader className='flex flex-col items-center text-center space-y-3'>
            <Construction size={48} className='text-muted-foreground' />
            <CardTitle className='font-bold text-xl'>Estamos trabajando en esta página</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-center'>
              El dashboard estará disponible próximamente.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
