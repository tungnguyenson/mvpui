# MVP UI — Common Patterns

## Modal (controlled state only)

`DialogTrigger` from react-aria-components requires an RAC-aware Button child. The `Button` component in this library is HTML-based and does not consume `PressResponderContext`. Use controlled state instead:

```tsx
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open</Button>

<ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen}>
  <Modal size="md">
    <Dialog>
      {({ close }) => (
        <>
          <ModalHeader>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold text-fg">Title</h2>
              <CloseButton onClick={close} className="shrink-0" />
            </div>
          </ModalHeader>
          <ModalBody>...</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={close}>Cancel</Button>
            <Button color="primary" onClick={close}>Confirm</Button>
          </ModalFooter>
        </>
      )}
    </Dialog>
  </Modal>
</ModalOverlay>
```

Same pattern applies to `Drawer`.

## Forms with react-hook-form

```tsx
import { useForm } from "react-hook-form";
import { HookForm, FormField, Input, Label, HintText } from "@mvp-ui/ui";

const form = useForm<{ email: string }>();

<HookForm form={form} onSubmit={form.handleSubmit(onSubmit)}>
  <FormField
    name="email"
    control={form.control}
    rules={{ required: "Email is required" }}
  >
    {({ field, fieldState }) => (
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...field}
          isInvalid={!!fieldState.error}
        />
        {fieldState.error && (
          <HintText variant="error">{fieldState.error.message}</HintText>
        )}
      </div>
    )}
  </FormField>
  <Button type="submit" color="primary">Submit</Button>
</HookForm>
```

## Icon prop pattern

All icon slots accept `FC<{ className?: string }> | ReactNode`:

```tsx
import { Star } from "lucide-react";

// Component reference (recommended — className forwarded automatically)
<Button icon={Star}>Starred</Button>

// ReactNode (use when you need to pass a pre-configured element)
<Button icon={<Star className="size-4 text-warning-fg" />}>Starred</Button>
```

## Compound components

Components with compound namespaces (Carousel, Tabs, ButtonGroup, PinInput) follow the same pattern — `Component.Root` + sub-components:

```tsx
<Carousel.Root opts={{ loop: true }}>
  <Carousel.Content>
    <Carousel.Item>Slide 1</Carousel.Item>
    <Carousel.Item>Slide 2</Carousel.Item>
  </Carousel.Content>
  <Carousel.PrevTrigger />
  <Carousel.NextTrigger />
  <Carousel.IndicatorGroup>
    {(api) => api.scrollSnaps.map((_, i) => (
      <Carousel.Indicator key={i} index={i} />
    ))}
  </Carousel.IndicatorGroup>
</Carousel.Root>
```

## React Aria vs HTML props

| Component | Base | Disabled prop | Press/click |
|---|---|---|---|
| Button | HTML | `disabled` | `onClick` |
| CloseButton | HTML | `disabled` | `onClick` |
| Checkbox | React Aria | `isDisabled` | — |
| Toggle | React Aria | `isDisabled` | — |
| Select | React Aria | `isDisabled` | — |
| Modal/Drawer | React Aria | — | `onOpenChange` |
| DatePicker | React Aria | `isDisabled` | — |

## Section layout pattern

```tsx
<Section
  title="Notifications"
  description="Manage what you're notified about."
  actions={<Button size="sm">Save</Button>}
>
  {/* section content */}
</Section>
```

`Section` renders `border-b border-border py-8` — wrap multiple sections in a container with `divide-y divide-border` for automatic dividers.
