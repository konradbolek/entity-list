'use client';
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import FormEntity from "./Form";
import Button from "@/helpers/Button";
import { AddOrEditEntity } from "@/types/Types";
import { useQuery } from "@apollo/client";
import { GET_ENTITY } from "@/graphql/queries/getEntity";

/**
 * Button with modal for display form to edit or add.
 */
const AddOrEditEntity: React.FC<AddOrEditEntity> = ({ id, title, containerClass }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [simpleNotifiaction, setSimpleNotifiaction] = useState<string>();
  function closeModal() {
    setIsOpen(false)
  }

  const { data: entityData } = useQuery(GET_ENTITY, {
    variables: { getEntityId: id },
  });

  const buttonTitle = () => {
    if (simpleNotifiaction) {
      setTimeout(() => {
        setSimpleNotifiaction("");
      }, 2500);
      return (simpleNotifiaction)
    } else {
      return (title)
    }
  }

  return (
    <>
      <Button title={buttonTitle()} setIsOpen={setIsOpen} containerClass={containerClass} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <FormEntity id={id} setIsOpen={setIsOpen} setSimpleNotifiaction={setSimpleNotifiaction} entityData={entityData?.getEntity} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default AddOrEditEntity;
