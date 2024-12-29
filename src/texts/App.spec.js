import { mount } from '@vue/test-utils'   // erstellen einer künstliche (virtuelle) Umgebung 
import App from '@/App.vue';


describe('App.vue', () => {
  let wrapper // Variable wrapper repräsentiert die "Verpackung" (also die Instanz) der gerenderten Vue-Komponente

  beforeEach(() => {
    wrapper = mount(App) // aufbau einer Testumgebung
  })

  it('zeigt den Titel an', () => {
    const title = wrapper.find('h1')
    expect(title.text()).toBe('Unsere ToDo\'s')
  })

  it('zeigt "Keine offenen Todos" an, wenn keine Todos vorhanden sind', () => {
    const message = wrapper.find('p')
    expect(message.text()).toBe('Keine offnen Todo\'s')
  })

  it('zeigt die Anzahl der offenen Todos korrekt an', async () => {
    //async weil Verzögerungen durch Benutzeraktionen oder Warten auf Änderungen im DOM
    await wrapper.setData({ todos: [{ titel: 'Test Todo 1', done: false }] })
    const openTodosCount = wrapper.find('p.text-xl')
    expect(openTodosCount.text()).toBe('Offene Todos: 1')
  })

  it('fügt ein neues Todo hinzu', async () => {
    const input = wrapper.find('input')
    const button = wrapper.find('button')

    await input.setValue('Neue Todo')
    await button.trigger('click')

    const todos = wrapper.vm.todos
    expect(todos).toHaveLength(1)
    expect(todos[0].titel).toBe('Neue Todo')
  })

  it('löscht ein Todo', async () => {
    //async weil Verzögerungen durch Benutzeraktionen oder Warten auf Änderungen im DOM
    await wrapper.setData({ todos: [{ titel: 'Todo zum Löschen', done: false }] })
    const deleteButton = wrapper.findAllComponents({ name: 'ToDo' }).at(0).find('button')

    await deleteButton.trigger('click')

    const todos = wrapper.vm.todos
    expect(todos).toHaveLength(0)
  })
})
