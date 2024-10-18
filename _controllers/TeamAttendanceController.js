const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchTeamMembers = async (company_id) => {
    try {
        const res = await fetch(API_URL + 'team-members/' + company_id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const fetchPresentAbsent = async (company_id) => {
    try {
        const res = await fetch(API_URL + 'present-absent/' + company_id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};


export { fetchTeamMembers, fetchPresentAbsent }