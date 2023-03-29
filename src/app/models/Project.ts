export interface Project {
    contactName:        string;
    jobTitle:           string;
    contactEmail:       string;
    contactPhone:       string;
    address:            Address;
    projectTitle:       string;
    projectDescription: string;
    technicalSkill:     string;
}

export interface Address {
    street: string;
    city:   string;
    state:  string;
    zip:    string;
}