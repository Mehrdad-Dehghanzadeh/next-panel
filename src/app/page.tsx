import { Button } from '@radix-ui/themes'
import { DataTable } from '@UIKits'
export default function Home() {
  return (
    <article id="home" className="p-4">
      <Button>سلام دنیا</Button>

      <DataTable
        className="mb-2"
        headers={[
          { keyData: 'name', title: 'نام' },
          { keyData: 'family', title: 'فامیلی' }
        ]}
        data={[{ name: 'mehrdad', family: 'dehghanzadeh' }]}
      ></DataTable>

      <DataTable
        headers={[
          { keyData: 'name', title: 'نام' },
          { keyData: 'family', title: 'فامیلی' }
        ]}
        data={[]}
      ></DataTable>
    </article>
  )
}
