"use client"

import { useState, useEffect } from "react";
import { fetchPresentAbsent, fetchTeamMembers } from "../../../../_controllers/TeamAttendanceController";
import { getCookie } from "@/app/utils/ClientHelpers";
import CustomFunction from "@/app/utils/CustomFunction";

const TeamPresence = (props) => {

	const [companyId, setCompanyId] = useState(null);
	const [departments, setDepartments] = useState([]); // State to hold multiple departments


	const getTeamMember = async (companyId) => {
		if (!companyId) return;

		const response = await fetchTeamMembers(companyId);
		if (response.status === 200) {
			setDepartments(response.data);
		}
		console.log(response)
	}

	const getPresentAbsent = async (companyId) => {
		if (!companyId) return;
		const response = await fetchPresentAbsent(companyId);
		if (response.status === 200) {
			setDepartments(response.data);
		}
		console.log(response)
	}

	useEffect(() => {
		const fetchData = async () => {
			setCompanyId(props.companyId);
			// await getTeamMember(props.companyId);
			getPresentAbsent(props.companyId);
		};

		fetchData();
	}, [props.companyId]);

	return (
		<>
			{departments.map((department) => (
				<div className="card mb-2" key={department.department_id}>
					<div className="card-header p-1">
						<strong className="d-flex justify-content-between align-items-center">{CustomFunction.toCapitalize(department.department)}  <span >{department.team_members}</span> </strong>  {/* Display department name */}
					</div>
					<div className="card-body d-flex flex-wrap justify-content-start p-1">
						{department.teamMembers.map((member) => (
							<span key={member._id} className="d-flex flex-column align-items-center m-1">

								<button type="button" className="btn btn-sm py-0" style={{ backgroundColor: member.in_time && member.out_time ? '#d5dbdb' : member.in_time ? '#1e8449' : '#d5dbdb' }}>
									{
										member.in_time ? <i className="bi bi-person" style={{ fontSize: '20px', color: 'white' }}></i> : <span style={{ fontSize: '18px', color: 'white' }}>A</span>
									}
								</button>
								
								<small className="m-0" style={{ fontSize: '12px' }}>{member.name.slice(0, 6)} </small> {/* Assuming member has a 'name' field */}
							</span>
						))}
					</div>
				</div>
			))}

		</>
	)

}

export default TeamPresence

