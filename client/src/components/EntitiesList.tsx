'use client';

import { GET_ENTITIES } from "@/graphql/queries/getEntities";
import { useQuery } from "@apollo/client";
import React from "react";
import { AgGridReact } from 'ag-grid-react';
import Notifications from "@/helpers/Notifiaction";
import { COLUMNS_DEFS } from "@/constants/ColumnDefs";

/**
 * Create entities list using AG Grid
 */
const EntitiesList = () => {

  const { data: entities, error, loading } = useQuery(GET_ENTITIES);
  if (error) {
    return (<Notifications type="red" text="Something went wrong." />)
  }

  return (
    <section>
      {
        loading ?
          <Notifications type="blue" text="Entities are loading. Please wait." />
          :
          <div
            className="ag-theme-quartz h-full"
            style={{ height: "500px" }}
          >
            <AgGridReact
              rowData={entities?.getEntities}
              columnDefs={COLUMNS_DEFS as []}
            />
          </div>
      }
    </section>
  )
}

export default EntitiesList;
