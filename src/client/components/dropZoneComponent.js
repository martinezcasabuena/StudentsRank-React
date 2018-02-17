import React, { Component } from 'react';
import {events} from '../lib/eventsPubSubs.js';
import Dropzone from 'react-dropzone'
//import PdfPreview from "react-pdf-preview";
import { Document, Page } from 'react-pdf';

class dropZoneComponent extends React.Component {
    constructor() {
      super()
      this.state = {
          files:[],
          numPages: null,
          pageNumber: 1,
          file:"../../src/SMX.pdf"
        }
    }

    onDrop(files) {
      this.setState({
          files: files,
        file:files[0].preview
      });
      console.log(this.state.file);
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //       const fileAsBinaryString = reader.result;
    //       // do whatever you want with the file content
    //   };
    //   reader.onabort = () => console.log('file reading was aborted');
    //   reader.onerror = () => console.log('file reading has failed');

    //   reader.readAsBinaryString(files);

    }
  
    render() {
        const pageNumber = this.state.pageNumber;
        const numPages = this.state.numPages;
        return (
            <div>
                <Document file={this.state.file}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>Page {pageNumber} of {numPages}</p>
              
                <Dropzone onDrop={this.onDrop.bind(this)}>
                    <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>

            </div>
          );
        
      return (
        <section>
          <div className="dropzone">
            <Dropzone onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>

          <aside>
            <h2>Dropped files</h2>
            <ul>
              {
                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>
        </section>
      );
    }
  }
  
  //<Basic />
export default dropZoneComponent;
