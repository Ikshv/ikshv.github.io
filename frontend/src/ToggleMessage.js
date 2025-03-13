import React, { useState } from 'react';

function ToggleMessage() {
    const [show, setShow] = useState(true);

    return (
        <div>
            <button onClick={() => setShow(!show)}>Toggle Message</button>
            {show && <p>This message can be toggled on and off.</p>}
        </div>
    );
}

export default ToggleMessage;