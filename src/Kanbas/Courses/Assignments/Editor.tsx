export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name"><h3>Assignment Name</h3></label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description" rows={9} cols={50}>
                The assignment is available online Submit a link to the landing page of your Web application running on Netlify.

                The landing page should include the following:

                Your full name and section
                Links to each of the lab assignments
                Link to the Kanbas application
                Links to all relevant source code repositories

                The Kanbas application should include a link to navigate back to the landing page.
            </textarea>
            <br />
            <br />
            <table >
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group"> Assignment Group: </label>
                    </td>

                    <select id="wd-group">
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="QUIZZES">QUIZZES</option>
                        <option value="EXAMS">EXAMS</option>
                        <option value="PROJECT">PROJECT</option>
                    </select>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as"> Display Grade as: </label>
                    </td>

                    <select id="wd-display-grade-as">
                        <option value="PERCENTAGE">PERCENTAGE</option>
                        <option value="DECIMAL">DECIMAL</option>
                        <option value="LETTER">LETTER</option>
                    </select>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type"> Submission Type: </label>
                    </td>

                    <select id="wd-submission-type">
                        <option value="ONLINE">Online</option>
                        <option value="In-Person">In-Person</option>
                    </select>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                    </td>
                    <label>Online Entry Options</label><br />

                    <input type="checkbox" id="wd-text-entry" />
                    <label htmlFor="wd-text-entry">Text Entry</label><br />

                    <input type="checkbox" id="wd-website-url" />
                    <label htmlFor="wd-website-url">Website URL</label><br />

                    <input type="checkbox" id="wd-media-recordings" />
                    <label htmlFor="wd-media-recordings">Media Recordings</label><br />

                    <input type="checkbox" id="wd-student-annotation" />
                    <label htmlFor="wd-student-annotation">Student Annotation</label><br />

                    <input type="checkbox" id="wd-file-upload" />
                    <label htmlFor="wd-file-upload">File Upload</label><br />
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label> Assign </label>
                    </td>
                    <td align="left" valign="top">
                        <label htmlFor="wd-assign-to"> Assign To: </label>
                        <br />
                        <input id="wd-assign-to" value="Everyone" />
                    </td>
                    <br />
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                    </td>
                    <label htmlFor="wd-due-date"> Due: </label><br/>
                    <input type="date"
                        id="wd-due-date"
                        value="2024-05-13" /><br />
                </tr>
                <br/>
                <tr>
                    <td align="right" valign="top">
                    </td>
                    <label htmlFor="wd-available-from"> Available from:</label>
                    &ensp;&ensp;&ensp;
                    <label htmlFor="wd-available-until"> Until: </label><br/>

                    <input type="date"
                        id="wd-available-from"
                        value="2024-05-06" /> <input type="date"
                        id="wd-available-until"
                        value="2024-05-20"/>
                        
                        
                </tr>
            </table>
            <hr />
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <button >Cancel</button> <button>Submit</button>
        </div>
    );
}
