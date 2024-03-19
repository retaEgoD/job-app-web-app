type User = {

    /**
     *  User Id as defined by the database.
     */
    user_id: int,
    
    /**
     * User's screen name.
     */
    username: string,
    
    /**
     * User's first name.
     */
    first_name: string,
    
    /**
     * User's last name.
     */
    last_name: string,
    
    /**
     * User's password as a hash.
     */
    password: string,
    
    /**
     * User's log in auth token. Null if logged out.
     */
    auth_token: string,
    
    /**
     * User's email address.
     */
    email: string,

}

type Job = {
    
    /**
     *  Job's Id as defined by the database.
     */
    job_id: number,
    
    /**
     * The Id of the user who uploaded the job.
     */
    user_id: number,
    
    /**
     * The job's job title.
     */
    job_title: string,
    
    /**
     * The company issuing the job.
     */
    company: string,
    
    /**
     * What industry the job is in.
     */
    industry: string,
    
    /**
     * The advertised salary of the job.
     * Use this if it's only a single value and not a range.
     */
    salary: number,
    
    /**
     * Whether super is included or not in the advertised salary.
     */
    is_super_included: boolean,
    
    /**
     * Whether the given salary is a range or not.
     */
    is_salary_ranged: boolean,
    
    /**
     * Minimum salary advertised.
     * Use this if the advertised salary is a range.
     */
    salary_min: number,
    
    /**
     * Maximum salary advertised.
     * Use this if the advertised salary is a range.
     */
    salary_max: number,
    
    /**
     * The link to the job application if it's an online listing.
     */
    job_listing_link: string,
    
    /**
     * The starting date for the job.
     */
    job_starting_date: date,
    
    /**
     * The status of the application.
     */
    application_status: number,
    
    /**
     * Any additional notes or description for the job.
     * Can be added by the user.
     */
    notes: string

}

type JobLocation = {
    
    /**
     * The job id that has this location.
     */
    job_id,
    
    /**
     * The location of the job.
     */
    job_location    
}