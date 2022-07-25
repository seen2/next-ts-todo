import { environmentVariables } from "../pages/api/hello";


export const {uri ,jwtKey}=environmentVariables;

export const bcryptSaltRounds=Number(environmentVariables.bcryptSaltRounds);
 