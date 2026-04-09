import { useState } from 'react'
import { PortalLayout }    from './portal/layout/PortalLayout'
import { ComponentDoc }    from './portal/components/ComponentDoc'
import { InstancePreview } from './portal/components/InstancePreview'

// Foundations pages
import { ColorsPage }     from './portal/pages/Foundations/ColorsPage'
import { TypographyPage } from './portal/pages/Foundations/TypographyPage'
import { SpacingPage }    from './portal/pages/Foundations/SpacingPage'

// Atoms
import { Button }  from './components/atoms/Button/Button'
import { Input }   from './components/atoms/Input/Input'
import { Badge }   from './components/atoms/Badge/Badge'

// Molecules
import { PriceTag }    from './components/molecules/PriceTag/PriceTag'
import { ProductCard } from './components/molecules/ProductCard/ProductCard'

// Organisms
import { GlobalHeader } from './components/organisms/GlobalHeader/GlobalHeader'
import { ProductGrid }  from './components/organisms/ProductGrid/ProductGrid'

/* ────────────────────────────────────────────────────────────────
   Shared layout helpers (inline, no extra files)
──────────────────────────────────────────────────────────────── */
const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
    {children}
  </div>
)

const StatesRow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
    {children}
  </div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    fontFamily: 'var(--nimble-font-headline)',
    fontSize: 10,
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.12em',
    color: 'var(--nimble-gray)',
    marginBottom: 12,
  }}>
    {children}
  </div>
)

const LiveProto = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    padding: '32px 24px',
    border: '1px dashed #2a2a2a',
    background: 'rgba(183,255,60,0.015)',
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    alignItems: 'center',
  }}>
    {children}
  </div>
)

/* ────────────────────────────────────────────────────────────────
   Page renderers
──────────────────────────────────────────────────────────────── */

function ButtonPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
      <ComponentDoc
        title="Button"
        type="Atom"
        description="Primary interactive element for all user actions. Two variants — Primary for high-emphasis CTAs, Secondary for supporting actions."
        code={`<Button variant="primary">Shop Now</Button>\n<Button variant="secondary">Explore Story</Button>\n<Button variant="primary" disabled>Unavailable</Button>`}
      >
        {/* Live prototype */}
        <div>
          <SectionTitle>Live Prototype — hover &amp; click to interact</SectionTitle>
          <LiveProto>
            <Button variant="primary">Shop Now</Button>
            <Button variant="secondary">Explore Story</Button>
            <Button variant="primary" disabled>Unavailable</Button>
          </LiveProto>
        </div>

        {/* Primary states */}
        <div>
          <SectionTitle>Primary Variant</SectionTitle>
          <StatesRow>
            <InstancePreview stateLabel="Default">
              <Button variant="primary">Shop Now</Button>
            </InstancePreview>
            <InstancePreview stateLabel="Hover">
              <Button variant="primary" pseudoState="hover">Shop Now</Button>
            </InstancePreview>
            <InstancePreview stateLabel="Active">
              <Button variant="primary" pseudoState="active">Shop Now</Button>
            </InstancePreview>
            <InstancePreview stateLabel="Disabled">
              <Button variant="primary" pseudoState="disabled">Shop Now</Button>
            </InstancePreview>
          </StatesRow>
        </div>

        {/* Secondary states */}
        <div>
          <SectionTitle>Secondary Variant</SectionTitle>
          <StatesRow>
            <InstancePreview stateLabel="Default">
              <Button variant="secondary">Explore Story</Button>
            </InstancePreview>
            <InstancePreview stateLabel="Hover">
              <Button variant="secondary" pseudoState="hover">Explore Story</Button>
            </InstancePreview>
            <InstancePreview stateLabel="Active">
              <Button variant="secondary" pseudoState="active">Explore Story</Button>
            </InstancePreview>
            <InstancePreview stateLabel="Disabled">
              <Button variant="secondary" pseudoState="disabled">Explore Story</Button>
            </InstancePreview>
          </StatesRow>
        </div>

        {/* Full-width */}
        <div>
          <SectionTitle>Full Width</SectionTitle>
          <div style={{ width: 320 }}>
            <InstancePreview stateLabel="Full Width">
              <Button variant="primary" fullWidth>Add to Cart</Button>
            </InstancePreview>
          </div>
        </div>
      </ComponentDoc>
    </div>
  )
}

function InputPage() {
  return (
    <ComponentDoc
      title="Input"
      type="Atom"
      description="Underline-style text input for forms. Supports default, focus, filled, disabled, and error states."
      code={`<Input label="Email" placeholder="your@email.com" />\n<Input label="Username" pseudoState="focus" defaultValue="" />\n<Input label="Password" pseudoState="error" errorMessage="Incorrect password" />`}
    >
      {/* Live prototype */}
      <div>
        <SectionTitle>Live Prototype — click to focus</SectionTitle>
        <LiveProto>
          <div style={{ width: 260 }}>
            <Input label="Email Address" placeholder="your@email.com" />
          </div>
          <div style={{ width: 260 }}>
            <Input label="Search" placeholder="Search products…" />
          </div>
        </LiveProto>
      </div>

      {/* All states */}
      <div>
        <SectionTitle>Interaction States</SectionTitle>
        <Row>
          <InstancePreview stateLabel="Default">
            <div style={{ width: 220 }}>
              <Input label="Email" placeholder="your@email.com" />
            </div>
          </InstancePreview>
          <InstancePreview stateLabel="Focus">
            <div style={{ width: 220 }}>
              <Input label="Email" placeholder="your@email.com" pseudoState="focus" />
            </div>
          </InstancePreview>
          <InstancePreview stateLabel="Filled">
            <div style={{ width: 220 }}>
              <Input label="Email" defaultValue="gamer@nimble.gg" />
            </div>
          </InstancePreview>
          <InstancePreview stateLabel="Disabled">
            <div style={{ width: 220 }}>
              <Input label="Email" placeholder="your@email.com" pseudoState="disabled" />
            </div>
          </InstancePreview>
          <InstancePreview stateLabel="Error">
            <div style={{ width: 220 }}>
              <Input
                label="Password"
                defaultValue="wrong"
                pseudoState="error"
                errorMessage="Incorrect password"
              />
            </div>
          </InstancePreview>
        </Row>
      </div>
    </ComponentDoc>
  )
}

function BadgePage() {
  return (
    <ComponentDoc
      title="Badge"
      type="Atom"
      description="Compact status labels for product states, categories, and tags. Three visual variants."
      code={`<Badge variant="accent">New Release</Badge>\n<Badge variant="outline">Limited Edition</Badge>\n<Badge variant="dark">Sold Out</Badge>`}
    >
      {/* Live proto */}
      <div>
        <SectionTitle>Live Prototype</SectionTitle>
        <LiveProto>
          <Badge variant="accent">New Release</Badge>
          <Badge variant="outline">Limited Edition</Badge>
          <Badge variant="dark">Sold Out</Badge>
        </LiveProto>
      </div>

      {/* All variants */}
      <div>
        <SectionTitle>Variants</SectionTitle>
        <StatesRow>
          <InstancePreview stateLabel="Accent">
            <Badge variant="accent">New Release</Badge>
          </InstancePreview>
          <InstancePreview stateLabel="Outline">
            <Badge variant="outline">Limited Edition</Badge>
          </InstancePreview>
          <InstancePreview stateLabel="Dark">
            <Badge variant="dark">Sold Out</Badge>
          </InstancePreview>
        </StatesRow>
      </div>

      {/* In context */}
      <div>
        <SectionTitle>In Context — product overlay</SectionTitle>
        <LiveProto>
          <div style={{ position: 'relative', width: 200, height: 120, background: '#111', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', padding: 8 }}>
            <Badge variant="accent">New Release</Badge>
          </div>
          <div style={{ position: 'relative', width: 200, height: 120, background: '#111', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', padding: 8 }}>
            <Badge variant="dark">Sold Out</Badge>
          </div>
        </LiveProto>
      </div>
    </ComponentDoc>
  )
}

function PriceTagPage() {
  return (
    <ComponentDoc
      title="PriceTag"
      type="Molecule"
      description="Displays current price with optional original price for discount visualization."
      code={`<PriceTag price={89.99} />\n<PriceTag price={89.99} originalPrice={129.99} />`}
    >
      <div>
        <SectionTitle>Live Prototype</SectionTitle>
        <LiveProto>
          <PriceTag price={89.99} />
          <PriceTag price={89.99} originalPrice={129.99} />
          <PriceTag price={0} originalPrice={49.99} />
        </LiveProto>
      </div>

      <div>
        <SectionTitle>Variants</SectionTitle>
        <StatesRow>
          <InstancePreview stateLabel="Price only">
            <PriceTag price={149.99} />
          </InstancePreview>
          <InstancePreview stateLabel="With discount">
            <PriceTag price={89.99} originalPrice={129.99} />
          </InstancePreview>
          <InstancePreview stateLabel="Free">
            <PriceTag price={0} originalPrice={49.99} />
          </InstancePreview>
        </StatesRow>
      </div>
    </ComponentDoc>
  )
}

function ProductCardPage() {
  return (
    <ComponentDoc
      title="ProductCard"
      type="Molecule"
      description="Full product showcase card combining image, badge, category, title, price, and CTA. Hover reveals an accent border and subtle image zoom."
      code={`<ProductCard\n  title="Pro Controller X"\n  category="Controllers"\n  price={89.99}\n  originalPrice={129.99}\n  isNew\n/>`}
    >
      <div>
        <SectionTitle>Live Prototype — hover the cards</SectionTitle>
        <LiveProto>
          <div style={{ width: 280 }}>
            <ProductCard
              title="Pro Controller X"
              category="Controllers"
              price={89.99}
              originalPrice={129.99}
              isNew
              imageUrl="https://placehold.co/600x600/111/B7FF3C?text=PRO+X"
            />
          </div>
          <div style={{ width: 280 }}>
            <ProductCard
              title="NimbleKeys TKL"
              category="Keyboards"
              price={149.99}
              imageUrl="https://placehold.co/600x600/111/F5F5F5?text=TKL"
            />
          </div>
        </LiveProto>
      </div>

      <div>
        <SectionTitle>Variants</SectionTitle>
        <Row>
          <InstancePreview stateLabel="Default">
            <div style={{ width: 260 }}>
              <ProductCard
                title="Stealth Mouse V2"
                category="Peripherals"
                price={59.99}
                imageUrl="https://placehold.co/600x600/111/A1A1A1?text=STEALTH"
              />
            </div>
          </InstancePreview>
          <InstancePreview stateLabel="With badge + discount">
            <div style={{ width: 260 }}>
              <ProductCard
                title="Pro Controller X"
                category="Controllers"
                price={89.99}
                originalPrice={129.99}
                isNew
                imageUrl="https://placehold.co/600x600/111/B7FF3C?text=PRO+X"
              />
            </div>
          </InstancePreview>
        </Row>
      </div>
    </ComponentDoc>
  )
}

function GlobalHeaderPage() {
  return (
    <ComponentDoc
      title="GlobalHeader"
      type="Organism"
      description="Sticky top navigation with logo, nav links, and action buttons. Nav items transition to accent on hover."
      code={`<GlobalHeader />`}
    >
      <div>
        <SectionTitle>Live Prototype — hover nav links</SectionTitle>
        <div style={{ border: '1px solid #1e1e1e', overflow: 'hidden' }}>
          <GlobalHeader />
        </div>
      </div>

      <div>
        <SectionTitle>Copy Full Component to Figma</SectionTitle>
        <InstancePreview stateLabel="Full Header" name="GlobalHeader">
          <div style={{ width: 900, overflow: 'hidden' }}>
            <GlobalHeader />
          </div>
        </InstancePreview>
      </div>
    </ComponentDoc>
  )
}

function ProductGridPage() {
  return (
    <ComponentDoc
      title="ProductGrid"
      type="Organism"
      description="Product listing section with section header, badge, and a responsive grid of ProductCard molecules."
      code={`<ProductGrid title="Latest Gear" columns={4} />`}
    >
      <div>
        <SectionTitle>Live Prototype — hover cards, click Add to Cart</SectionTitle>
        <ProductGrid title="Latest Gear" columns={4} />
      </div>

      <div>
        <SectionTitle>2-Column Variant</SectionTitle>
        <ProductGrid title="Featured" columns={2} />
      </div>
    </ComponentDoc>
  )
}

/* ────────────────────────────────────────────────────────────────
   App root
──────────────────────────────────────────────────────────────── */
function App() {
  const [activeItem, setActiveItem] = useState('Colors')

  const renderPage = () => {
    switch (activeItem) {
      // Foundations
      case 'Colors':      return <ColorsPage />
      case 'Typography':  return <TypographyPage />
      case 'Spacing':     return <SpacingPage />
      // Atoms
      case 'Button':      return <ButtonPage />
      case 'Input':       return <InputPage />
      case 'Badge':       return <BadgePage />
      // Molecules
      case 'PriceTag':    return <PriceTagPage />
      case 'ProductCard': return <ProductCardPage />
      // Organisms
      case 'GlobalHeader': return <GlobalHeaderPage />
      case 'ProductGrid':  return <ProductGridPage />
      default:             return <ColorsPage />
    }
  }

  return (
    <PortalLayout activeItem={activeItem} onNavigate={setActiveItem}>
      {renderPage()}
    </PortalLayout>
  )
}

export default App
