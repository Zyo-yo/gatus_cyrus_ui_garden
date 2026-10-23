import { useState } from 'react';
import styled from 'styled-components';
import { Button } from './components/Button/Index';
import { Label } from './components/Label/Index';
import { Text } from './components/Text/Index';
import { Dropdown } from './components/Dropdown/Index';
import { RadioButton } from './components/RadioButton/Index';
import { Table } from './components/Table/Index';
import { TableHeader } from './components/TableHeader/Index';
import { TableRow } from './components/TableRow/Index';
import { TableCell } from './components/TableCell/Index';
import { TableFooter } from './components/TableFooter/Index';
import { Img } from './components/Img/Index';
import { HeroImage } from './components/HeroImage/Index';
import { Card } from './components/Card/Index';

const Page = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 20px 64px;

  h1 {
    margin: 8px 0 16px;
    font-size: clamp(2rem, 5vw, 3.5rem);
    letter-spacing: -0.04em;
  }

  @media (max-width: 480px) {
    padding: 20px 12px 40px;
  }
`;

const Section = styled.section`
  margin-top: 32px;
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  background: #ffffff;
  min-width: 0;

  h2 {
    margin-top: 0;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  > * {
    min-width: 0;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  min-width: 0;
`;

const Toggle = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  margin: 12px 0 24px;
  font-weight: 600;
  cursor: pointer;

  input {
    width: 20px;
    height: 20px;
    accent-color: #2563eb;
  }
`;

const Status = styled.p`
  padding: 12px;
  border-radius: 8px;
  background: #eff6ff;
  color: #1e3a8a;
`;

function App() {
  const [disabled, setDisabled] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [course, setCourse] = useState('react');
  const [delivery, setDelivery] = useState('standard');

  return (
    <Page>
      <header>
        <Label text="Assignment 12 · Cyrus Gatus - Hello Maninder! 👋" />
        <h1>UI Garden</h1>
        <p>A responsive React component library built with styled-components.</p>
        <Toggle>
          <input
            type="checkbox"
            checked={disabled}
            onChange={(event) => setDisabled(event.target.checked)}
          />
          Disable all showcase components
        </Toggle>
      </header>

      <HeroImage
        src="/images/garden.svg"
        alt="Green hills beneath a blue sky and golden sun"
        title="Room for good ideas to grow."
        description="Explore the components below, then toggle their disabled states."
        disabled={disabled}
      />

      <Section aria-labelledby="basics-heading">
        <h2 id="basics-heading">Button, Label &amp; Text</h2>
        <Grid>
          <Stack>
            <Label text="Reusable building blocks" disabled={disabled} />
            <Text
              text="Each component includes TypeScript props, Storybook stories, and automated tests."
              disabled={disabled}
            />
          </Stack>
          <Stack>
            <Button
              label="Try the button"
              disabled={disabled}
              onClick={() => setClicks((value) => value + 1)}
            />
            <Status role="status">Button clicks: {clicks}</Status>
          </Stack>
        </Grid>
      </Section>

      <Section aria-labelledby="forms-heading">
        <h2 id="forms-heading">Dropdown &amp; RadioButton</h2>
        <Grid>
          <Stack>
            <Dropdown
              label="Choose a course"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              options={[
                { label: 'React', value: 'react' },
                { label: 'TypeScript', value: 'typescript' },
                { label: 'Storybook', value: 'storybook' },
              ]}
              disabled={disabled}
            />
            <p>Selected course: {course}</p>
          </Stack>
          <div role="radiogroup" aria-label="Delivery method">
            <Stack>
              <RadioButton
                label="Standard delivery"
                name="showcase-delivery"
                value="standard"
                checked={delivery === 'standard'}
                onChange={() => setDelivery('standard')}
                disabled={disabled}
              />
              <RadioButton
                label="Express delivery"
                name="showcase-delivery"
                value="express"
                checked={delivery === 'express'}
                onChange={() => setDelivery('express')}
                disabled={disabled}
              />
            </Stack>
          </div>
        </Grid>
      </Section>

      <Section aria-labelledby="table-heading">
        <h2 id="table-heading">Table &amp; subcomponents</h2>
        <Table disabled={disabled}>
          <caption>Library component groups</caption>
          <TableHeader>
            <TableRow>
              <th scope="col">Group</th>
              <th scope="col">Components</th>
            </TableRow>
          </TableHeader>
          <tbody>
            <TableRow>
              <TableCell>Basics</TableCell>
              <TableCell>Button, Label, Text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Forms</TableCell>
              <TableCell>Dropdown, RadioButton</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tables</TableCell>
              <TableCell>Table, TableHeader, TableRow, TableCell, TableFooter</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Media</TableCell>
              <TableCell>Img, HeroImage, Card</TableCell>
            </TableRow>
          </tbody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>13 components</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Section>

      <Section aria-labelledby="media-heading">
        <h2 id="media-heading">Img &amp; Card</h2>
        <Grid>
          <Img
            src="/images/garden.svg"
            alt="Illustrated green hills and sunshine"
            title="A landscape that scales with its container."
            disabled={disabled}
          />
          <Card
            src="/images/garden.svg"
            alt="Green hills beneath a golden sun"
            title="Built to be reused"
            description="Responsive images, readable text, and consistent disabled styling."
            disabled={disabled}
          />
        </Grid>
      </Section>

      <footer>
        <p>Cyrus Gatus · Assignment 12 · React + TypeScript + Storybook</p>
      </footer>
    </Page>
  );
}

export default App;
