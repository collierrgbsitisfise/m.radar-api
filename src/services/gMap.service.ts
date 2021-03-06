class centerPoint {
  latitude: number;
  longitude: number;
}
class gMapService {
  private apiKey: string;
  public maptype: string;
  public center: centerPoint;
  public markers: centerPoint[];

  constructor(apiKey: string, center: centerPoint, maptype: string) {
    this.apiKey = apiKey;
    this.center = center;
    this.maptype = maptype;
  }

  public setMarker(markers: centerPoint[]): void {
    this.markers = markers;
  }

  private getZoomFromRadius(r: number): number | string {
    const mapper: any = {
      2: 14,
      5: 13,
      10: 12,
      30: 11,
      50: 10
    };

    return mapper[String(r)] || 10;
  }

  private getMarketsForAsQParams(): string {
    return this.markers.reduce(
      (acc, curr) =>
        (acc += `markers=${
          (curr as any).type === "patrol"
            ? "color:orange%7Clabel:P%7C"
            : "color:red%7Clabel:C%7C"
        }${curr.latitude},${curr.longitude}&`),
      ""
    );
  }

  public generateMapLink(radius: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${
      this.center.latitude
    },${this.center.longitude}&zoom=${this.getZoomFromRadius(
      radius
    )}&size=1400x1000&maptype=${
      this.maptype
    }&${this.getMarketsForAsQParams()}key=${this.apiKey}`;
  }
}

export default gMapService;
