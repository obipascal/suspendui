/**
 * SuspendUI and fetch resources from api server.
 *
 * @template SuspendUI
 */
export class SuspendUI<SuspendUI> {
    constructor(props: any);
    state: {
        /** by default render loader while resources are been fetched. */
        suspendui: boolean;
        /** if api server request fails render error fallbak  */
        hasError: boolean;
    };
    componentDidMount(): void;
    render(): any;
}
export namespace SuspendUI {
    namespace propTypes {
        const loader: Function;
        const errorfallback: Function;
        const fetch: Function;
    }
}
