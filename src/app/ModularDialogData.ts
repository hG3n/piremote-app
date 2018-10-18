export interface ModularDialogData {
    title: string;
    subtitle: string;
    fields: DialogDataField[];
}

export interface DialogDataField {
    title: string;
    placeholder: string;
    value: any;
}
