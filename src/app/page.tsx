'use client'
import { requiredRule, nationalCodeRule } from '@assets/validationsRules'
import { Button } from '@radix-ui/themes'
import { DataTable, InputField } from '@UIKits'
import { useForm } from 'react-hook-form'

export default function Home() {
  const { control, handleSubmit } = useForm<{ text1: string }>({
    defaultValues: { text1: '' }
  })

  const onSubmit = (data: unknown) => {
    console.log(data)
  }

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

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          control={control}
          name="text1"
          placeholder="نام"
          rules={{ required: requiredRule(), validate: nationalCodeRule }}
          clearable
        />

        <Button type="submit">ذخیره</Button>
      </form>
    </article>
  )
}
