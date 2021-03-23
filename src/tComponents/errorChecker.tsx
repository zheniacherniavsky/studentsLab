function CreateError({ error }: { error: any }) {
  if (error) {
    throw new Error("Special Error, created ib ErrorChecker.tsx");
  }
}

export default CreateError;
