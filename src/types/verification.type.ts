interface VerificationApplication {
    id: string;
    full_name: string;
    birthday: string;
    number: string;
}

export interface VerificationEntry {
    application: VerificationApplication;
    images: string[];
}
  