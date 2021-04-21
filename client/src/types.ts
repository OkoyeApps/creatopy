export type Projects = {
    title?: string;
    description?: string;
    id?: number;
    createdBy? : string;
    Users: UserType[]
}


type UserType = {
    firstName?: string;
    lastName?: string;
    id?: string;
    email?: string;
    Projects? : Projects
};