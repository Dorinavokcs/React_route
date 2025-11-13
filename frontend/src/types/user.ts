export type publicUser = {
    id: number;
    name: string;
    email: string;
    birthdate?: string;
};

export type PostUser = {
    name: string;
    email: string;
    birthdate?: string;
    password: string;
};

export type PatchUser = Partial<PostUser>