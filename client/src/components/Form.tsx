"use client";

import * as React from "react";
import { useMutation } from "@apollo/client";
import { EntityType, FormType } from "@/types/Types";
import { useState } from "react";
import { CREATE_ENTITY } from "@/graphql/mutations/createEntity";
import { GET_ENTITIES } from "@/graphql/queries/getEntities";
import { UPDATE_ENTITY } from "@/graphql/mutations/updateEntity";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, FormSchemaCompany, FormSchemaContact } from "@/types/Form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GET_ENTITY } from "@/graphql/queries/getEntity";
import SimpleFormField from "@/helpers/SimpleFormField";

/**
 * Form for create or Edit entities. 
 * When props ID is set form is in edit option without ID is to create a new entity.
 */
const FormEntity: React.FC<FormType> = ({ id, setIsOpen, setSimpleNotifiaction, entityData }) => {

  const [entityTypeValue, setEntityTypeValue] = useState<EntityType>(
    id ? (entityData?.email ? EntityType.CONTACT : EntityType.COMPANY) : EntityType.CONTACT
  );
  const options: EntityType[] = Object.values(EntityType);

  const defValues = entityTypeValue === EntityType.CONTACT ?
    {
      name: entityData ? entityData.name : "",
      entityType: EntityType.CONTACT,
      email: entityData ? entityData.email : "",
      phone: entityData ? entityData.phone : "",
    } : {
      name: entityData ? entityData.name : "",
      entityType: EntityType.COMPANY,
      industry: entityData ? entityData.industry : "",
      contactEmail: entityData ? entityData.contactEmail : "",
    }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: entityTypeValue === EntityType.CONTACT ? zodResolver(FormSchemaContact) : zodResolver(FormSchemaCompany),
    defaultValues: { ...defValues }
  })

  const [addEntities] = useMutation(CREATE_ENTITY, {
    refetchQueries: [GET_ENTITIES, "GetEntities"],
  });

  const [updateEntities] = useMutation(UPDATE_ENTITY, {
    refetchQueries: [{ query: GET_ENTITIES }, { query: GET_ENTITY, variables: { id: id } }],
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    if (id) {
      await updateEntities({ variables: { "input": { ...values, id: id, entityType: entityTypeValue } } });
      setSimpleNotifiaction("Updated");
    } else {
      await addEntities({ variables: { "input": { ...values, entityType: entityTypeValue } } });
      setSimpleNotifiaction("Added");
    }
    setIsOpen(false);
    form.reset();
  }

  const resetForm = (form: { setValue: any }) => {
    form.setValue("name", "");
    form.setValue("industry", "");
    form.setValue("phone", "");
    form.setValue("email", "");
    form.setValue("contactEmail", "");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="entityType"
          render={() => (
            <FormItem className="space-y-3">
              <FormLabel>Entity type:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    value && setEntityTypeValue(value as EntityType);
                    resetForm(form);
                  }}
                  defaultValue={entityTypeValue}
                  className="flex flex-col space-y-1"
                >
                  {options.map((value: EntityType) => (
                    <FormItem key={value} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {value}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SimpleFormField form={form} name="name" title="Name" desctription="Set name." />
        {entityTypeValue === EntityType.CONTACT ? (
          <>
            <SimpleFormField form={form} name="email" title="Email" desctription="Set email." />
            <SimpleFormField form={form} name="phone" title="Phone" desctription="Set phone." />
          </>
        ) : (
          <>
            <SimpleFormField form={form} name="industry" title="Industry" desctription="Set Industry." />
            <SimpleFormField form={form} name="contactEmail" title="Contact email" desctription="Set Contact email." />
          </>
        )}
        <Button className="bg-blue-600 text-white hover:bg-blue-400 mr-3 mt-10" type="submit">Submit</Button>
        <Button variant="secondary" type="button" onClick={() => { setIsOpen(false) }}>Close</Button>
      </form>
    </Form>
  );
};

export default FormEntity;
