import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SimpleFormField } from "@/types/SimpleFormField";

/**
 * Simple form field for shadcn input form
 */
const SimpleFormField = ({ form, name, title, desctription }: SimpleFormField) => {

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormDescription>{desctription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SimpleFormField;
