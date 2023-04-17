
export class BundleInfo {
    id: string;
    name: string;
    obsolete: string;
    serviceCategories: ModelServiceCategoryEnum[];
}

export enum ModelServiceCategoryEnum {
    SFX_STD,
    STD,
    HIGH,
    ULTRA,
    OTHER,
    EDGE,
    EDGE_PRO,
    EDGE_SOLAR,
    GMDSS_TEL,
    SBD,
    GO_STD,
    SFX_IMT
}
