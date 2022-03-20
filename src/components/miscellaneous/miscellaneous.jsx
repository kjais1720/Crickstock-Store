export function Badge({badgeCount}){
    return <div className={`${styles.badge} badge badge-red`}>{badgeCount}</div>
}

export function ProductBadge({badgeText}){
    return (<div class="tr-card-badge">{badgeText}</div>)
}
