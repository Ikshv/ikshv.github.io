import React from 'react';

function UploadProject() {
    return (
        <div>
            <h1>Upload Project</h1>
            <form>
                <label>Project Name</label>
                <input type="text" name="project-name" />
                <label>Project Description</label>
                <textarea name="project-description"></textarea>
                <label>Project Image</label>
                <input type="file" name="project-image" />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default UploadProject;
