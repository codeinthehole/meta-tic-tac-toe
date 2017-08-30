// A "Space" is a single element within a (normally 3x3) "Grid". It simply
// renders a "mark" (normally a 0 or X)
import React from 'react';

export default ({mark}) => <div className="space">{mark}</div>
