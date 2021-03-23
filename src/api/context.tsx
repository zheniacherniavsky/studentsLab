import React from "react";
import IContextType from "@/api/context.d";

const Context = React.createContext<Partial<IContextType>>({});

export default Context;
