import { useEffect, useRef, useState } from 'react';
import { Alert, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useUser from '../lib/hooks/useUser';
import Router from 'next/router'

const FormComponent = ({ sectors, user = undefined, redirectTo = '', redirectIfFound = false }) =>  {
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const { mutateUser } = useUser({
    redirectTo,
    redirectIfFound
  });
  const formRef = useRef(null);
  const listedSectors = [];
  const rootSectors = sectors?.filter(sector => sector.parent_id === "000000000000000000000000");
  useEffect(() => {
    if (user) {
      formRef.current.name.value = user.name;
      formRef.current.terms.checked = user.terms;
    }
  }, )

  const handleSubmlt = async (event) => {
    try {
    event.preventDefault();
    if (formRef.current.checkValidity() === true) {
      const currentObj = formRef.current;
      const selectedSectors = Array.from(currentObj.sectors.selectedOptions, option => option.value);
      const userObj = { name: currentObj.name.value, sector_ids: selectedSectors, terms: currentObj.terms.checked };
      let response;
      if (user) {
        response = await editUser(userObj);
      } else {
        response = await createUser(userObj);
      }
      const data = await response.json();
      setMessage(data.message);
      setShow(true);
      Router.push('/');
    }
    setValidated(true);
    } catch (err) {
      console.error(err);
    }
  }

  const createUser = async (userObj) => {
    let response; 
    mutateUser(response = await fetch('/api/users', { method: 'POST', 
      body: JSON.stringify({ user: userObj }), 
      headers: {
        "Content-Type": 
        "application/json",
      },
    }));
    return response
  }

  const editUser = async (userObj) => {
    const response = await fetch(`/api/users/${user._id}`, { method: 'PUT', 
      body: JSON.stringify({ user: userObj }), 
      headers: {
        "Content-Type": 
        "application/json",
      },
    });
    return response
  }

  let options = [];
  const renderSectors = (sector) => {
    if (!listedSectors.find(sec => sec._id === sector._id)) {
      listedSectors.push(sector);
      options.push(<option value={sector._id} name={sector._id} key={sector._id}
        style={{ marginLeft: parseInt(sector.level)*20}}>{sector.name}</option>);
      const children = sectors.filter(sec => sec.parent_id === sector._id);
      children.map(child => renderSectors(child))
    }
    return options;
  }

  return (
    <Form noValidate onSubmit={handleSubmlt} ref={formRef} validated={validated}>
      {show && <Alert variant="success" onClose={() => setShow(false)} dismissible>
        {message}
      </Alert>}
      <Form.Group>
        <Form.Label htmlFor="name">Name:</Form.Label>
        <InputGroup hasValidation>
          <Form.Control type="text" id="name" name="name" required />
          <Form.Control.Feedback type="invalid">
            Please enter name
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="sector">Sectors:</Form.Label>
        <InputGroup hasValidation>
          <Form.Select multiple aria-label="sectors-selector" name="sectors" defaultValue={user?.sector_ids} required>
            {rootSectors?.map(sector => 
                renderSectors(sector)
            )}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select atleast one sector
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Check 
          type="checkbox"
          label="Agree to terms"
          name="terms"
          feedback="You must agree before submitting."
          feedbackType="invalid"
          className='my-3'
          required
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default FormComponent;







