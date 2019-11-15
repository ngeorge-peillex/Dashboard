import about from "../services/about";
import { fetchOneWidget, updateWidget } from "../services/widget";

export class Widget {
  id = ""
  refreshRate = 0;

  constructor(args) {
    this.service = args.service;
    this.name = args.name;
    this.description = args.description;
    this.requireAccessToken = args.requireAccessToken;
    this.params = args.params;
    this.isVisible = this.requireAccessToken ? false : true;
    this.isConnected = this.requireAccessToken ? false : true;
  }

  async update(params, fetch) {
    let newData; 
    if (fetch) {
      newData = await fetchOneWidget(this.name);
    } else {
      newData = await updateWidget({ ...params, id: this.id });
    }

    if (!newData || newData == {}) return
    this.id = newData.id
    this.isVisible = newData.isVisible
    this.isConnected = newData.isConnected
  }
}

const widgets = (async () => {
  let services = (await about())["server"]["services"];
  let widgets = [];
  for (let service of Object.values(services)) {
    for (let widget of service.widgets) {
      widgets.push(new Widget({ service: service.name, ...widget }));
      widgets[widgets.length - 1].update({}, true)
    }
  }

  return widgets;
})();

export default widgets;
