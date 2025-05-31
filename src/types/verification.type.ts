interface VerificationApplication {
id: string;
full_name: string;
birthday: string;
number: string;
}

interface VerificationEntry {
application: VerificationApplication;
images: string[];
}
  