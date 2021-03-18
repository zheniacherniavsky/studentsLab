function CreateError({ error }) {
  if (error) {
    throw new Error("Special Error, created ib ErrorChecker.tsx");
  }
}

export default CreateError;
