class centerPoint {
    latitude: number;
    longitude: number;
}
class  gMapService {
    private apiKey:string;
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
    
    private getMarketsForAsQParams(): string {
        return this.markers.reduce((acc,curr) => acc += `markers=color:red%7Clabel:C%7C${curr.latitude},${curr.longitude}&` , '');
    }

    public generateMapLink() {
        return `https://maps.googleapis.com/maps/api/staticmap?center=${this.center.latitude},${this.center.longitude}&zoom=12&size=900x500&maptype=${this.maptype}&${this.getMarketsForAsQParams()}key=${this.apiKey}`
    }
}

export default gMapService;

// https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyAoNsfuomFR9sqJThzQvZuTAZQp61Gaa9o