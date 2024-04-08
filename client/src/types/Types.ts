export enum EntityType {
  CONTACT = "CONTACT",
  COMPANY = "COMPANY",
}

export interface Entity {
  id: number;
  name: string;
}

export interface Contact extends Entity {
  email: string;
  phone?: string;
}

export interface Company extends Entity {
  industry: string;
  contactEmail?: string;
}

export interface InputData {
  name?: string;
  entityType: EntityType;
  email?: string;
  contactEmail?: string;
  phone?: string;
  industry?: string;
}

export interface CreateEntityInput extends InputData {
  name: string;
}

export interface UpdateEntityInput extends InputData {
  id: number;
  name?: string;
}

export interface AddOrEditEntity {
  id?: number;
  title: string;
  containerClass?: string;
  setSimpleNotification?: string;
}

export interface FormType {
  id?: number;
  setIsOpen: (arg: boolean) => void;
  setSimpleNotifiaction: (arg: string) => void;
  entityData: InputData;
}
